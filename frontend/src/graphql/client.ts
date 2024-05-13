import { gql } from "@apollo/client";

export const COUNTRIES = gql`
	query Countries {
		countries {
			id
			code
			name
			emoji
			continent {
				id
				name
			}
		}
	}
`;

export const CONTINENTS = gql`
	query Continents {
		continents {
			id
			name
		}
	}
`;

export const COUNTRY_BY_CODE = gql`
	query Country($code: String!) {
		country(code: $code) {
			id
			name
			emoji
			code
			continent {
				id
				name
			}
		}
	}
`;

export const ADD_COUNTRY = gql`
	mutation AddCountry($data: NewCountryInput!) {
		addCountry(data: $data) {
			id
			name
			code
			emoji
			continent {
				id
				name
			}
		}
	}
`;
