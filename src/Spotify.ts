import Track from "./typing/Track";

const clientId = '74639cabdd1e4c2aae147fbdd6659cee';
const redirectURI = window.location.origin;
const scopes = 'user-read-currently-playing';

export default class SpotifyClient {
	private accessToken: string | undefined;
	private tokenType: string | undefined;
	private expiresAt: number | undefined;
	public track: Track | undefined;
	constructor() {}

	async setTokens(access_token: string, expires_in: number, token_type: string) {
		this.accessToken = access_token;
		this.expiresAt = expires_in * 1000 + Date.now();
		this.tokenType = token_type;
	}

	async getCurrentlyPlaying() {
		if (!this.accessToken) {
			throw new Error("No access token");
		}

		if ((this.expiresAt ?? 0) < Date.now()) {
			window.location.href = this.generateRedirect();
		}

		let data = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `${this.tokenType} ${this.accessToken}`
			}
		}).then(r => r.json());
		this.track = data as Track;
		return data;
	}

	generateRedirect() {
		var url = 'https://accounts.spotify.com/authorize';
		url += '?response_type=token';
		url += '&client_id=' + encodeURIComponent(clientId);
		url += '&scope=' + encodeURIComponent(scopes);
		url += '&redirect_uri=' + encodeURIComponent(redirectURI);

		return url;
	}
}