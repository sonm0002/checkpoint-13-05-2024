import Link from "next/link";

export default function Header() {
	return (
		<header
			style={{
				backgroundColor: "#c9b9a9",
				padding: 20,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				color: "white",
			}}
		>
			<h1>Checkpoint : frontend</h1>
			<Link href="/">Countries</Link>
		</header>
	);
}
