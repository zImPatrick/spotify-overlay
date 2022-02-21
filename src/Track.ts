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
interface Item {
	album: Album;
	duration_ms: number;
	name: string;
	artists: Artist[];
}

export default interface Track {
	item: Item;
	progress_ms: number;
}