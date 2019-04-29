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
  extra: boolean;
  college: string;

  tracks?: Track[];
}

export class Track {
  name: string;
  sex: string;
  athletes?: Athlete[];
}

export class Registration {
  name: string;
  track: string;
  bestMark?: number;
  athlete: Athlete;
}
