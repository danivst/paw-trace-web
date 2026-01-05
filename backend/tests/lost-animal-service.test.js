import { jest } from "@jest/globals";

// Mock the LostAnimal model
jest.unstable_mockModule("../models/lost-animal.js", () => {
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
  createLostAnimal,
  getLostAnimals,
  getLostAnimalById,
  updateLostAnimal,
  deleteLostAnimal,
} = await import("../services/lost-animal-service.js");

const LostAnimal = (await import("../models/lost-animal.js")).default;

describe("lost-animal-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createLostAnimal calls model.create with data and returns created animal", async () => {
    const data = { name: "Rex" };
    const created = { id: 1, ...data };
    LostAnimal.create.mockResolvedValue(created);

    const result = await createLostAnimal(data);

    expect(LostAnimal.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(created);
  });

  test("getLostAnimals builds where filter and returns list", async () => {
    const filters = { type: "dog", location: "park", date: "2024-01-01" };
    const animals = [{ id: 1 }, { id: 2 }];
    LostAnimal.findAll.mockResolvedValue(animals);

    const result = await getLostAnimals(filters);

    expect(LostAnimal.findAll).toHaveBeenCalled();
    expect(result).toEqual(animals);
  });

  test("getLostAnimalById returns animal by id", async () => {
    const animal = { id: 1, name: "Rex" };
    LostAnimal.findByPk.mockResolvedValue(animal);

    const result = await getLostAnimalById(1);

    expect(LostAnimal.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(animal);
  });

  test("updateLostAnimal returns number of updated rows", async () => {
    LostAnimal.update.mockResolvedValue([1]);

    const updated = await updateLostAnimal(1, { name: "New Rex" });

    expect(LostAnimal.update).toHaveBeenCalledWith(
      { name: "New Rex" },
      { where: { id: 1 } }
    );
    expect(updated).toBe(1);
  });

  test("deleteLostAnimal returns number of deleted rows", async () => {
    LostAnimal.destroy.mockResolvedValue(1);

    const deleted = await deleteLostAnimal(1);

    expect(LostAnimal.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(deleted).toBe(1);
  });
});


