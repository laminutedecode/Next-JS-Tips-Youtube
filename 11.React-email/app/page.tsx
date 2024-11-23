"use client"

import ContactForm from "@/app/components/ContactForm"


export default function Home() {

  const handleFormSubmit = async (email: string) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST', // Assurez-vous que c'est bien un POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  
  

  return (
    <div className="h-screen w-full flex items-center justify-center">
    
    <ContactForm onSubmit={handleFormSubmit} />

    </div>
  );
}
