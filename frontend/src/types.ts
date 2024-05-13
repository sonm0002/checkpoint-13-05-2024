export type CountryType = {
	id: string;
	name: string;
	code: string;
	continentCode: string;
	emoji: string;
};

export type CountryInput = {
	name: string;
	code: string;
	continentCode: string;
	emoji: string;
};

export type ContinentType = {
	id: string;
	name: string;
};
