import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitDto } from './create-produit.dto';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {
  libelle: string;

  quantite: string;

  prix: number;
}
