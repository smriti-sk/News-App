export interface NewsSectionInterface {
    id:string;
    cols: number;
    rows: number;
    img_class: string;
    grid_class: string;
    background_color: string;
    border_color: string;
}

export interface NewsData {
    title :string;
    link? :string;
    category :string;
    country :string;
    language :string;
    creator? :string;
    source_icon? :string;
    source_url :string;
    source_id :string;
    source_priority? :string;
    image_url? :string;
    pubDate? :string;
    description :string;
}
