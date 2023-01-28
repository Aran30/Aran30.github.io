export const experiences: ExperienceYear[] = [
  {
    year: 2022,
    experiences: [
      { title: 'Worked as ERSTI-Mentor at RWTH', date: new Date('2022-10-03') },
    ],
  },
  {
    year: 2020,
    experiences: [
      { title: 'Bachelors Degree', date: new Date('2020-10-09') },
      {
        title: 'Work as research at RWTH I5 ACIS group',
        date: new Date('2020-10-09'),
      },
    ],
  },
];

export interface ExperienceYear {
  year: number;
  experiences?: Experience[];
}
export interface Experience {
  title: string;
  subtitle?: string;
  date?: Date;
}
