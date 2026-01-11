import { jest } from "@jest/globals";

process.env.JWT_SECRET = "testsecret";

jest.unstable_mockModule("../models/user.js", () => {
  const mockModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  return {
    __esModule: true,
    default: mockModel,
  };
});

jest.unstable_mockModule("bcrypt", () => {
  return {
    __esModule: true,
    default: {
      hash: jest.fn(),
      compare: jest.fn(),
    },
    hash: jest.fn(),
    compare: jest.fn(),
  };
});

jest.unstable_mockModule("jsonwebtoken", () => {
  return {
    __esModule: true,
    default: {
      sign: jest.fn(),
    },
    sign: jest.fn(),
  };
});

const {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById,
} = await import("../services/user-service.js");

const User = (await import("../models/user.js")).default;
const bcryptModule = await import("bcrypt");
const jwtModule = await import("jsonwebtoken");

const bcrypt = bcryptModule.default;
const jwt = jwtModule.default;

describe("user-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("registerUser hashes password and creates user", async () => {
    const data = { email: "test@example.com", password: "plain" };
    bcrypt.hash.mockResolvedValue("hashed");
    const created = { id: 1, email: data.email };
    User.create.mockResolvedValue(created);

    const result = await registerUser(data);

    expect(bcrypt.hash).toHaveBeenCalledWith("plain", 10);
    expect(User.create).toHaveBeenCalledWith({
      ...data,
      password: "hashed",
    });
    expect(result).toEqual(created);
  });

  test("loginUser returns nulls when user not found", async () => {
    User.findOne.mockResolvedValue(null);

    const result = await loginUser({
      email: "missing@example.com",
      password: "x",
    });

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: "missing@example.com" },
    });
    expect(result).toEqual({ user: null, token: null });
  });

  test("loginUser returns nulls when password mismatch", async () => {
    const user = { id: 1, password: "hashed", role: "user" };
    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    const result = await loginUser({
      email: "user@example.com",
      password: "wrong",
    });

    expect(bcrypt.compare).toHaveBeenCalledWith("wrong", "hashed");
    expect(result).toEqual({ user: null, token: null });
  });

  test("loginUser returns user and token on success", async () => {
    const user = { id: 1, password: "hashed", role: "user" };
    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("token123");

    const result = await loginUser({
      email: "user@example.com",
      password: "correct",
    });

    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toEqual({ user, token: "token123" });
  });

  test("updateUserById hashes password if provided and updates user", async () => {
    bcrypt.hash.mockResolvedValue("newHashed");
    User.update.mockResolvedValue([1]);

    const updated = await updateUserById(1, {
      name: "New",
      email: "new@example.com",
      phone: "123",
      password: "newpass",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("newpass", 10);
    expect(User.update).toHaveBeenCalledWith(
      {
        name: "New",
        email: "new@example.com",
        phone: "123",
        password: "newHashed",
      },
      { where: { id: 1 } }
    );
    expect(updated).toBe(1);
  });

  test("deleteUserById returns number of deleted rows", async () => {
    User.destroy.mockResolvedValue(1);

    const deleted = await deleteUserById(1);

    expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(deleted).toBe(1);
  });
});

