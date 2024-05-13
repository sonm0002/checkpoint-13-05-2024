import { ADD_COUNTRY, COUNTRIES, CONTINENTS } from "@/graphql/client";
import { CountryType, CountryInput, ContinentType } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import {
	Box,
	Button,
	MenuItem,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";

const LatteButton = styled(Button)({
	boxShadow: "none",
	textTransform: "none",
	fontSize: 16,
	padding: "6px 12px",
	border: "1px solid",
	color: "white",
	lineHeight: 1.5,
	backgroundColor: "#a38f85",
	borderColor: "#a38f85",
	fontFamily: [
		"-apple-system",
		"BlinkMacSystemFont",
		'"Segoe UI"',
		"Roboto",
		'"Helvetica Neue"',
		"Arial",
		"sans-serif",
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(","),
	"&:hover": {
		backgroundColor: "#7d695e",
		borderColor: "#7d695e",
		boxShadow: "none",
	},
	"&:active": {
		boxShadow: "none",
		backgroundColor: "#7d695e",
		borderColor: "#a38f85",
	},
});

const defaultState: CountryInput = {
	name: "",
	code: "",
	continentCode: "",
	emoji: "",
};

export default function Home() {
	const isMobile = useMediaQuery("(max-width:600px)");
	const router = useRouter();
	const [form, setForm] = useState(defaultState);
	console.log("form", { form });

	const {
		data: dataCountries,
		loading: loadingCountries,
		error: errorCountries,
	} = useQuery(COUNTRIES);
	const {
		data: dataContinents,
		loading: loadingContinents,
		error: errorContinents,
	} = useQuery(CONTINENTS);
	const [
		create_country,
		{ data: dataCreate, loading: loadingCreate, error: errorCreate },
	] = useMutation(ADD_COUNTRY);

	const handleSubmit = async () => {
		await create_country({
			variables: {
				data: {
					name: form?.name,
					emoji: form?.emoji,
					code: form.code,
					continent: {
						id: form.continentCode,
					},
				},
			},
		})
			.then(() => toast.success("Pays crée !"))
			.catch((e) => {
				toast.error(`Erreur ${e}`);
			});
	};

	useEffect(() => {
		if (loadingCountries) {
			toast.info("coucou");
		}
		if (errorCountries) {
			toast.error(`Erreur ${errorCountries}`);
		}
	}, [errorCountries]);

	useEffect(() => {
		if (errorContinents) {
			toast.error(`Erreur ${errorContinents}`);
		}
	}, [errorContinents]);

	return (
		<>
			<Box p={4}>
				<Box
					component="form"
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDirection={isMobile ? "column" : "row"}
					gap={4}
					onSubmit={handleSubmit}
				>
					<TextField
						id="name"
						placeholder="Nom"
						variant="standard"
						required
						onChange={(e) => setForm({ ...form, name: e.target.value })}
					/>
					<TextField
						id="emoji"
						placeholder="Emoji"
						variant="standard"
						required
						onChange={(e) => setForm({ ...form, emoji: e.target.value })}
					/>
					<TextField
						id="code"
						placeholder="Code"
						variant="standard"
						required
						onChange={(e) => setForm({ ...form, code: e.target.value })}
					/>
					<TextField
						id="continentCode"
						defaultValue=""
						select
						size="medium"
						sx={{ width: 100 }}
						variant="standard"
						required
						onChange={(e) =>
							setForm({ ...form, continentCode: e.target.value })
						}
					>
						{dataContinents?.continents
							? dataContinents.continents.map((continent: ContinentType) => {
									return (
										<MenuItem key={continent?.id} value={continent?.id}>
											{continent?.name}
										</MenuItem>
									);
							  })
							: []}
					</TextField>
					<LatteButton type="submit">Créer</LatteButton>
				</Box>
				<Box>
					<Typography
						variant="h4"
						component="h4"
						sx={{ color: "#7d695e" }}
						my={4}
					>
						Liste des pays
					</Typography>
					{dataCountries?.countries ? (
						<Box
							display="flex"
							flexDirection="row"
							gap={4}
							sx={{
								display: "grid",
								gridTemplateColumns: `${
									isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
								}`,
								flexDirection: "column",
							}}
						>
							{dataCountries.countries.map((country: CountryType) => {
								return (
									<Box
										key={country.id}
										display="flex"
										alignItems="center"
										justifyContent="center"
										component="section"
										gap={4}
										sx={{
											backgroundColor: "#c9b9a9",
											border: "1px solid #c9b9a9",
											color: "white",
											textAlign: "center",
											borderRadius: 5,
											flex: 1,
										}}
										onClick={() =>
											router.push({
												pathname: "/country/[code]",
												query: { code: country.code },
											})
										}
									>
										<div key={country.id}>
											<p>{country.name}</p>
											<p>{country.code}</p>
											<p>{country.emoji}</p>
										</div>
									</Box>
								);
							})}
						</Box>
					) : (
						<></>
					)}
				</Box>
			</Box>
		</>
	);
}
