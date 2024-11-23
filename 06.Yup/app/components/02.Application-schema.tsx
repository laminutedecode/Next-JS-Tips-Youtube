"use client"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/app/schemas/yupSchema';
import { InferType } from "yup";

// InferType permet d'inférer dynamiquement le type d'objet que Yup valide à partir d'un schéma Yup donné. Cela signifie que si vous avez un schéma Yup qui décrit la structure d'un objet avec ses types et ses propriétés, InferType peut extraire et déduire automatiquement le type TypeScript correspondant à cet objet.

type User = InferType<typeof userSchema>;



export default function Home() {

  // register est une fonction qui permet d'enregistrer les champs de formulaire React avec le hook useForm. Elle sert à connecter les champs de formulaire avec react-hook-form, ce qui permet au hook de gérer leur état, leur validation et leur récupération des valeurs.
  // handleSubmit est une fonction qui sert à gérer la soumission d'un formulaire. Elle prend en charge la validation, la collecte des données du formulaire et l'exécution de la fonction onSubmit lorsque le formulaire est validé et soumis.
  // formState est un objet qui contient plusieurs propriétés liées à l'état actuel du formulaire. Ces propriétés incluent des informations sur les erreurs de validation, l'état de soumission du formulaire et d'autres détails utiles.


  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit = (data: User) => {
    console.log(data);
  };

  return (
    <>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
       
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom:
              </label>
              <input id="name" {...register('name')} type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Âge:
              </label>
              <input id="age" {...register('age')} type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input id="email" {...register('email')} type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Site web:
              </label>
              <input id="website" {...register('website')} type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website.message}</p>}
            </div>
           
          </div>
          <div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
