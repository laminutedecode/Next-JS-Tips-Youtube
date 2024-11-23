
"use client"

import Image from "next/image"
import MyImage from "@/public/image.jpg"


export default function Home() {

const imgUrl = "https://images.unsplash.com/photo-1718556256225-82afc1b30580?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


  return (
    <>
       <Image
          src={MyImage}
          width={500}
          height={500}
          alt="Picture of the author"
          
          // fill={true} 
          // Indique si l'image doit remplir son conteneur. (Utilise object-fit: cover sous le capot)
          // Pour que cela fonctionne, le parent doit avoir les classes CSS w-full h-[500px] et position relative
          

          sizes="(max-width: 768px) 100vw, 33vw" 
          // Définit les tailles des images en fonction des conditions de la media query.
          // Cela permet d'optimiser le chargement de l'image en fonction de la taille de l'écran.

          quality={80} 
          // Qualité de l'image entre 1 et 100.
          // Plus la valeur est élevée, meilleure est la qualité de l'image, mais le temps de chargement peut augmenter.

          priority={true} 
          // Indique que l'image doit être chargée en priorité. 
          // Utilisée pour les images importantes qui doivent être chargées immédiatement, comme les images au-dessus de la ligne de flottaison.

          placeholder="blur" 
          // Définit un effet de flou avant que l'image ne soit chargée.
          // Les options disponibles sont 'blur' pour un effet de flou et 'empty' pour aucun effet de remplissage.

          onLoadingComplete={() => console.log('Image loaded')} 
          // Fonction appelée lorsque le chargement de l'image est terminé. (Dépréciée)
          // Utilisée pour effectuer des actions une fois que l'image a fini de se charger.

          onLoad={() => console.log('Image loading started')} 
          // Fonction appelée lorsque l'image commence à se charger.
          // Utilisée pour effectuer des actions au début du chargement de l'image.

          onError={() => console.log('Image loading failed')} 
          // Fonction appelée lorsque le chargement de l'image échoue.
          // Utilisée pour gérer les erreurs de chargement d'image et effectuer des actions spécifiques.

          loading="eager" 
          // Indique si l'image doit être chargée de manière paresseuse.
          // Les options disponibles sont 'eager' pour un chargement immédiat et 'lazy' pour un chargement différé (paresseux).
          // Le "chargement paresseux" (lazy loading en anglais) est une technique d'optimisation des performances utilisée sur le web pour différer le chargement de contenus non critiques (comme les images) jusqu'à ce qu'ils soient vraiment nécessaires. Cela signifie que les images (ou d'autres ressources) ne sont chargées que lorsqu'elles sont sur le point d'entrer dans la zone de visualisation de l'utilisateur (viewport).
          // Le chargement "hâtif" (eager loading en anglais) est une technique où les images (ou d'autres ressources) sont chargées immédiatement lors du rendu de la page, indépendamment de leur position dans la zone de visualisation de l'utilisateur (viewport). Cette approche garantit que toutes les ressources sont disponibles dès que possible, ce qui peut être utile pour les éléments critiques qui doivent être visibles immédiatement.

          // overrideSrc={imgUrl} 
          // URL de remplacement de l'image. 
          // Utilisée pour spécifier une URL alternative à utiliser si l'image principale ne peut pas être chargée.
        />

    </>
  );
}
