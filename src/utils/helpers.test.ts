import { describe, it, expect } from "vitest";
import { getAverage, getFilmCompanyNameById, mapMovieData } from "./helpers";

const mockCompanies = [
  { id: "1", name: "Eleven Productions" },
  { id: "2", name: "Film Studios LTD" },
];

describe("getFilmCompanyNameById", () => {
  it("return company name when id matches company id", () => {
    expect(getFilmCompanyNameById("1", mockCompanies)).toBe(
      "Eleven Productions"
    );
  });

  it("returns undefined when no company ids match id", () => {
    expect(getFilmCompanyNameById("3", mockCompanies)).toBe(undefined);
  });
});

describe("getAverage", () => {
  it("returns average of valueset", () => {
    expect(getAverage([1, 2, 5, 6])).toBe("3.5");
    expect(getAverage([5])).toBe("5.0");
  });

  it("returns NaN when an empty array is passed", () => {
    expect(getAverage([])).toBe("NaN");
  });
});

describe("mapMovieData", () => {
  const mockMovies = [
    {
      cost: 20000,
      filmCompanyId: "1",
      id: "2",
      releaseYear: 2000,
      reviews: [1, 4, 5, 8],
      title: "Summer",
    },
    {
      cost: 50000,
      filmCompanyId: "2",
      id: "9",
      releaseYear: 2010,
      reviews: [3, 1, 3, 8, 8, 7],
      title: "Superman",
    },
  ];

  const mappedMockedMovies = [
    {
      averageReviewScore: "4.5",
      filmCompany: "Eleven Productions",
      id: "2",
      title: "Summer",
    },
    {
      averageReviewScore: "5.0",
      filmCompany: "Film Studios LTD",
      id: "9",
      title: "Superman",
    },
  ];

  it("returns mapped movie data", () => {
    expect(mapMovieData(mockMovies, mockCompanies)).toStrictEqual(
      mappedMockedMovies
    );
  });
});
