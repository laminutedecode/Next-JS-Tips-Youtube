/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Protocole requis pour les images distantes (https)
        protocol: "https",
        // Nom d'hôte pour les images provenant de Unsplash
        hostname: 'img.clerk.com',
        // Chemin autorisé pour toutes les images de Unsplash
        pathname: "**" // Le double astérisque (**) signifie que tous les chemins d'images sont autorisés
      },
    ],
  }
};

export default nextConfig;