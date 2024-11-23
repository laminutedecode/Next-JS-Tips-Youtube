import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup.string().required("Le nom est requis").min(3, 'Le nom doit faire plus de 3 caracteres de long').max(5, 'Le nom doit faire moins 5 de caracteres de long'),
  age: yup.number().required("L'âge est requis").positive("L'âge doit être positif").integer("L'âge doit être un entier"),
  email: yup.string().email("L'email doit être valide"),
  website: yup.string().url("L'URL doit être valide").nullable(),
  //.nullable  est utilisée pour indiquer qu'une valeur peut être null. Par défaut, de nombreux schémas de Yup ne considèrent pas null comme une valeur valide à moins que vous ne le spécifiiez explicitement en utilisant .nullable. Cela permet de gérer les valeurs nulles de manière flexible, en plus des autres contraintes de validation que vous avez définies.
  createdOn: yup.date().default(() => new Date()),
  // default est utilisée pour definir une valuer par defaullt
  sex: yup.mixed().oneOf(['Homme', 'Femme', 'Autres'] as const).defined(),
  //.mixed()  est une méthode qui peut être utilisée pour définir des schémas de validation qui peuvent accepter différents types de valeurs. 
  // .oneOf()  est utilisée pour définir un schéma de validation où la valeur validée doit faire partie d'une liste spécifiée de valeurs acceptables. 
  //.defined() est utilisée pour spécifier qu'un champ doit avoir une valeur définie et non undefined
  tel: yup.string()
  .matches(/^(0|\+33)[1-9]\d{8}$/, 'Le numéro de téléphone doit commencer par 0 ou +33 et contenir exactement 10 chiffres')
  .required("Le numéro de téléphone est requis"),
  // La méthode .shape est utilisée pour définir la structure d'un schéma. Elle permet de spécifier les clés et les validations associées pour un objet. Vous pouvez créer des schémas qui valident des objets avec des propriétés spécifiques, chacune ayant ses propres règles de validation.
  address: yup.object().shape({
    street: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().required(),
  }),
});




