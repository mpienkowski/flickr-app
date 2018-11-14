export interface Photo {
  id: string;
  title: string;
  description: { content: string };
  owner: string;
  ownername: string;
  datetaken: string;
}
