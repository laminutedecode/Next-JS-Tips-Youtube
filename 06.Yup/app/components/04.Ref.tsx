"use client"

// La fonction ref de Yup est utilisée pour créer une référence à un autre champ du même objet ou à un champ descendant. Cette référence est résolue au moment de la validation ou de la conversion (cast). Cela permet de dépendre dynamiquement des valeurs d'autres champs dans le schéma de validation.
import * as yup from 'yup';
// Imaginons que vous avez un schéma utilisateur qui inclut des informations d'adresse imbriquées (schema)

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/app/schemas/yupSchema';
import { InferType } from "yup";

type User = InferType<typeof userSchema>;


const schema = yup.object().shape({
  baz: yup.ref('foo.bar'),
  foo: yup.object().shape({
    bar: yup.string().required('Le champ bar est obligatoire'),
  }),
  x: yup.ref('$x'),
});

// Le champ baz est défini comme une référence à foo.bar. Donc, baz prendra la valeur de foo.bar.
// Le champ x est défini comme une référence à une variable de contexte $x. Donc, x prendra la valeur de la variable de contexte x passée lors de l'appel de cast.

export default function Home() {



  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    // ###utilisation du context
    context: { x: 5 }
  });

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
     
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Foo Bar</label>
        <input {...register('foo.bar')} />
        {errors.foo?.bar && <p>{errors.foo.bar.message}</p>}
      </div>
      <div>
        <label>Baz (reference to Foo Bar)</label>
        <input {...register('baz')} readOnly />
      </div>
      <div>
        <label>X (from context)</label>
        <input {...register('x')} readOnly />
      </div>
      <button type="submit">Submit</button>
    </form>

      </div>
    </div>
    </>
  );
}
