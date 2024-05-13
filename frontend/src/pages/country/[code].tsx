import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { useQuery } from "@apollo/client";
import { COUNTRY_BY_CODE } from "@/graphql/client";
import { useEffect } from "react";

export default function Country() {
	const router = useRouter();

	const { data, loading, error } = useQuery(COUNTRY_BY_CODE, {
		variables: { code: router.query.code },
	});

	useEffect(() => {
		if (error) {
			console.log("error", error);
		}
	}, [error]);

	return (
		<>
			<Box alignContent="center" display="flex" justifyContent="center">
				{data?.country ? (
					<>
						<Box
							alignContent="center"
							display="flex"
							justifyContent="center"
							flexDirection="column"
							textAlign="center"
							gap={2}
						>
							<Typography>{data.country.emoji}</Typography>
							<Typography>{data.country.name}</Typography>
							<Typography>{data.country.code}</Typography>
							{data.country.continent ? (
								<>
									<p>Continent : {data.country.continent.name}</p>
								</>
							) : (
								<></>
							)}
						</Box>
					</>
				) : (
					<></>
				)}
			</Box>
		</>
	);
}
