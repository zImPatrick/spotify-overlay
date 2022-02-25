interface Image {
	url: string;
	width: number;
	height: number;
}
interface Artist {
	name: string;
}
interface Album {
	images: Image[];
}

interface ExternalUrls {
	spotify: string;
}
interface Item {
	album: Album;
	duration_ms: number;
	name: string;
	artists: Artist[];
	external_urls: ExternalUrls;
}

export default interface Track {
	item: Item;
	progress_ms: number;
	currently_playing_type: string;
}