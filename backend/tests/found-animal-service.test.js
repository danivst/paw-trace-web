import { jest } from "@jest/globals";

jest.unstable_mockModule("../models/found-animal.js", () => {
  const mockModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  return {
    __esModule: true,
    default: mockModel,
  };
});

const {
  createFoundAnimal,
  getFoundAnimals,
  getFoundAnimalById,
  updateFoundAnimal,
  deleteFoundAnimal,
} = await import("../services/found-animal-service.js");

const FoundAnimal = (await import("../models/found-animal.js")).default;

describe("found-animal-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createFoundAnimal calls model.create with data and returns created animal", async () => {
    const data = { type: "dog" };
    const created = { id: 1, ...data };
    FoundAnimal.create.mockResolvedValue(created);

    const result = await createFoundAnimal(data);

    expect(FoundAnimal.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(created);
  });

  test("getFoundAnimals passes filters to findAll and returns list", async () => {
    const filters = { type: "cat" };
    const animals = [{ id: 1 }, { id: 2 }];
    FoundAnimal.findAll.mockResolvedValue(animals);

    const result = await getFoundAnimals(filters);

    expect(FoundAnimal.findAll).toHaveBeenCalledWith({
      where: filters,
      order: [["date_time", "DESC"]],
    });
    expect(result).toEqual(animals);
  });

  test("getFoundAnimalById returns animal by id", async () => {
    const animal = { id: 1 };
    FoundAnimal.findByPk.mockResolvedValue(animal);

    const result = await getFoundAnimalById(1);

    expect(FoundAnimal.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(animal);
  });

  test("updateFoundAnimal returns number of updated rows", async () => {
    FoundAnimal.update.mockResolvedValue([1]);

    const updated = await updateFoundAnimal(1, { type: "dog" });

    expect(FoundAnimal.update).toHaveBeenCalledWith(
      { type: "dog" },
      { where: { id: 1 } }
    );
    expect(updated).toBe(1);
  });

  test("deleteFoundAnimal returns number of deleted rows", async () => {
    FoundAnimal.destroy.mockResolvedValue(1);

    const deleted = await deleteFoundAnimal(1);

    expect(FoundAnimal.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(deleted).toBe(1);
  });
});

