export class College {
  name: string;
  initials: string;
}

export class User {
  username: string;
  permission: string;
  token?: string;
}

export class Athlete {
  name: string;
  rg: string;
  rgOrgao: string;

  sex: string;
  college: string;

  tracks?: Registration[];
}

export class Track {
  name: string;
  sex: string;
  athletes?: Athlete[];
}

export class Registration {
  trackName: string;
  athlete?: Athlete;
  extra: boolean;
  bestMark?: number;
}
