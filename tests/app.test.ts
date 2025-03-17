import {
	createPokemon,
	addPokemon,
	fetchPokemon,
	fetchPokemonWithError,
	updatePokemon,
	deletePokemon,
} from "../src/app";
import { database, Pokemon } from "../src/model";

describe("Pokemon CRUD Operations", () => {
	///* Make sure the database is empty before each test.  This runs before each test.  See https://jestjs.io/docs/api */

	beforeEach(() => {
		// Reset the database before each test to ensure tests are isolated
		database.length = 0;
	});

	test("Pokemon was created", async () => {
		const initialLength = database.length;
		const newLength = await createPokemon({
			name: "Pikachu",
			type: "Electric",
		});
		expect(newLength).toBe(1);

		expect(database).toContainEqual({ name: "Pikachu", type: "Electric" });
	}); //eof test1

	test("Pokemon was added", async () => {
		const pokemon = { name: "Pikachu", type: "Electric" };
		const result = await addPokemon(pokemon);
		expect(result).toEqual([{ name: "Pikachu", type: "Electric" }]);
	});

	test("Pokemon retrieve Pokemon after adding", async () => {
		const pokemon = { name: "Pikachu", type: "Electric" };
		await createPokemon(pokemon);
		const result = await fetchPokemon();
		expect(result).toEqual([{ name: "Pikachu", type: "Electric" }]);
	});

	test("fetchPokemonWithError throws an error", async () => {
		await expect(fetchPokemonWithError()).rejects.toThrow(
			"Failed to fetch Pokemon",
		);
	});

	test("Pokemon updated", async () => {
		addPokemon({ name: "Pikachu", type: "Electric" });
		await updatePokemon({ name: "Pikachu", type: "Normal" });

		expect(database).toContainEqual({ name: "Pikachu", type: "Normal" });
	});

	test("Pokemon not found to update", async () => {
		const nonExistentPokemon: Pokemon = { name: "Arceus", type: "Dragon" };

		await expect(updatePokemon(nonExistentPokemon)).rejects.toThrow(
			"Pokemon not found",
		);
	});

	test("Pokemon deleted", async () => {
		addPokemon({ name: "Pikachu", type: "Electric" });
		const result = await deletePokemon({
			name: "Pikachu",
			type: "Electric",
		});

		expect(result).toBe("Pokemon Deleted");
	});

	test("Pokemon not found to delete", async () => {
		const nonExistentPokemon: Pokemon = { name: "Arceus", type: "Normal" };

		await expect(deletePokemon(nonExistentPokemon)).rejects.toThrow(
			"Pokemon not found",
		);
	});
}); //eof test suite
