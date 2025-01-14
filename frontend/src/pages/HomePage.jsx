import { Container, Flex, Input, Select, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("default");

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const processedProducts = useMemo(() => {
		let result = [...products];

		if (searchTerm.trim()) {
			result = result.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (sortBy === "price-asc") {
			result.sort((a, b) => a.price - b.price);
		} else if (sortBy === "price-desc") {
			result.sort((a, b) => b.price - a.price);
		} else if (sortBy === "name-asc") {
			result.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortBy === "name-desc") {
			result.sort((a, b) => b.name.localeCompare(a.name));
		}

		return result;
	}, [products, searchTerm, sortBy]);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products ðŸš€
				</Text>

				{products.length > 0 && (
					<Flex
						gap={4}
						maxW='600px'
						w='full'
						direction={{ base: "column", sm: "row" }}
						align='center'
					>
						<Input
							placeholder='Search products...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							flex={1}
						/>

						<Select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							w={{ base: "full", sm: "200px" }}
						>
							<option value='default'>Sort By</option>
							<option value='price-asc'>Price: Low to High</option>
							<option value='price-desc'>Price: High to Low</option>
							<option value='name-asc'>Name: A to Z</option>
							<option value='name-desc'>Name: Z to A</option>
						</Select>
					</Flex>
				)}

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{processedProducts.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found ðŸ˜¢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}

				{products.length > 0 && searchTerm && processedProducts.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found matching "{searchTerm}" ðŸ˜¢
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;
