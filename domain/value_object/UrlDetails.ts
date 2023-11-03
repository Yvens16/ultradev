
interface IUrlDetailsParams {
  videoPreviewUrl?: string;
  videoUrl?: string;
  gitpodUrl?: string | undefined;
  codetourUrl?: string | undefined;
}

export default class UrlDetails {
  private videoPreviewUrl?: string;
  private videoUrl?: string;
  private gitpodUrl?: string | undefined;
  private codetourUrl?: string | undefined;

  constructor(params: IUrlDetailsParams) {
    this.videoUrl = params.videoUrl;
    this.gitpodUrl = params.gitpodUrl;
    this.codetourUrl = params.codetourUrl;
    this.videoPreviewUrl = params.videoPreviewUrl;
  }

  public getVideoPreviewUrl(): string | undefined {
    return this.videoPreviewUrl;
  }

  public getVideoUrl(): string | undefined {
    return this.videoUrl;
  }

  public getGitpodUrl(): string | undefined {
    return this.gitpodUrl;
  }

  public getCodetourUrl(): string | undefined {
    return this.codetourUrl;
  }
}