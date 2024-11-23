"use client"

import UserValidation from './components/05.ValidationSchema';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/app/schemas/yupSchema';
import { InferType } from "yup";

type User = InferType<typeof userSchema>;


export default function Home() {


  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: yupResolver(userSchema),

  });

  const onSubmit = (data: User) => {
    console.log(data);
  };

  return (
    <>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">

        {/* #### */}
        <UserValidation/>

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
            <div className="mb-4">
              <label htmlFor="createdOn" className="block text-sm font-medium text-gray-700">
                Date de création:
              </label>
              <input id="createdOn" {...register('createdOn')} type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.createdOn && <p className="mt-1 text-sm text-red-500">{errors.createdOn.message}</p>}
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
