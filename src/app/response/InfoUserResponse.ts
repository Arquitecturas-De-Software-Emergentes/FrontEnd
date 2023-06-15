export interface InfoUserResponse {
  data: {
    about: string;
    bannerPicture: string;
    email: string;
    firstName: string;
    languages: string;
    lastName: string;
    profilePicture: string;
    skills: string;
    studyCenter: string;
    workingPlaces: string;
  };
  message: string;
  warning: boolean;
}
