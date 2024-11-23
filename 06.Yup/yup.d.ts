// Nous allons maintenant ajouter des métadonnées personnalisées à notre schéma pour stocker des informations supplémentaires comme un texte de placeholder ou un tooltip.
import 'yup';

declare module 'yup' {
  interface CustomSchemaMetadata {
    placeholderText?: string;
    tooltipText?: string;
  }
}

