import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validation basique
    if (!body.name || !body.email || !body.message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Champs obligatoires manquants'
      })
    }

    // 📧 Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: ['nevezio.contact@gmail.com'],
      subject: `[Portfolio] ${body.subject || 'Nouveau contact'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #059669;">✉️ Nouveau message depuis ton portfolio</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Nom :</strong> ${body.name}</p>
            <p><strong>📧 Email :</strong> ${body.email}</p>
            <p><strong>💰 Budget :</strong> ${body.budget || 'Non spécifié'}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #059669;">
            <h3>💬 Message :</h3>
            <p style="white-space: pre-line;">${body.message}</p>
          </div>
          
          <hr />
          <p style="color: #6b7280; font-size: 12px;">
            📅 Envoyé le ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      `
    })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur lors de l\'envoi'
      })
    }

    return { 
      success: true, 
      message: 'Email envoyé avec succès !',
      id: data?.id 
    }

  } catch (error) {
  console.error(error);
  throw createError({
    statusCode: 500,
    statusMessage: 'Erreur serveur'
  });
}
})