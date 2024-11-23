/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permet d'utiliser un fournisseur de cloud pour optimiser les images à la place de l'API d'optimisation d'image intégrée à Next.js.
    // loader: 'custom',
    // Fichier relatif qui contient la fonction de chargement personnalisée pour les images.
    // loaderFile: './my/image/loader.js',
    // Définition des patterns d'images distantes autorisées
    remotePatterns: [
      {
        // Protocole requis pour les images distantes (https)
        protocol: "https",
        // Nom d'hôte pour les images provenant de Unsplash
        hostname: 'images.unsplash.com',
        // Chemin autorisé pour toutes les images de Unsplash
        pathname: "**" // Le double astérisque (**) signifie que tous les chemins d'images sont autorisés
      },
    ],
    // Tailles de dispositif prises en charge pour le composant Image
    deviceSizes: [320, 420, 768, 1024, 1200],
    // Largeurs d'image spécifiques pour la création des srcsets
    imageSizes: [16, 32, 48, 64, 96],
    // Formats d'image pris en charge par l'API d'optimisation d'image
    formats: ['image/avif', 'image/webp'],
    // Durée de vie minimale du cache pour les images optimisées (en secondes)
    minimumCacheTTL: 60,
    // Désactive l'importation statique des images (ex: import image from './image.png')
    disableStaticImages: false,
    // Autorise le chargement d'images SVG avec l'API d'optimisation d'image (potentiellement dangereux)
    dangerouslyAllowSVG: false,
  }
};

export default nextConfig;
