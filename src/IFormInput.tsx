export interface IFormInput {
  asset_id: string;
  name: string;
  picture: string;
  external_link: string;
  description: string;
  collection: number;
  supply: number;
  royalties: number;
  date_of_creation: string;
}

export interface ICFormProps {
  onComplete: (data: IFormInput) => void;
}
