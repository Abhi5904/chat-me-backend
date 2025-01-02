export interface IMediaSchema {
  type: 'image' | 'video' | 'file';
  url: string;
  thumbnail: string;
}
