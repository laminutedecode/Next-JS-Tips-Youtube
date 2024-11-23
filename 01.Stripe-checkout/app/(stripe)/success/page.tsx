'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    if (token) {
      axios.get(`/api/success`, { params: { token } })
        .then(response => setCustomerData(response.data))
        .catch(error => console.error('Error fetching customer data:', error));
    }
  }, [token]);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col gap-3 text-center'>
      <h1>✅ Paiement réussi!</h1>
      {customerData ? (
        <div>
          <p>Merci pour votre achat, {customerData?.name}!</p>
          <ul>
            <li>Email: {customerData?.email}</li>
          </ul>
        </div>
      ) : (
        <p>Loading customer data...</p>
      )}
    </div>
  );
}
