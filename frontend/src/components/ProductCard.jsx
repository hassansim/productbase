import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { useFavoritesStore } from "../store/favorites";
import { useState, useRef } from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();
	const { isFavorite, toggleFavorite } = useFavoritesStore();
	const isFav = isFavorite(product._id);

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isDeleteOpen,
		onOpen: onOpenDelete,
		onClose: onCloseDelete,
	} = useDisclosure();
	const cancelDeleteRef = useRef();

	const handleDeleteProduct = async (pid) => {
		onCloseDelete();
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' aria-label='Edit product' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={onOpenDelete}
						colorScheme='red'
						aria-label='Delete product'
					/>
					<IconButton
						icon={isFav ? <FaHeart color='#E53E3E' /> : <FaRegHeart />}
						onClick={() => toggleFavorite(product._id)}
						variant='outline'
						colorScheme={isFav ? "red" : "gray"}
						aria-label='Toggle favorite'
					/>
				</HStack>
			</Box>

			{/* Edit Product Modal */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Delete Confirmation Alert Dialog */}
			<AlertDialog
				isOpen={isDeleteOpen}
				leastDestructiveRef={cancelDeleteRef}
				onClose={onCloseDelete}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Product
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to delete "{product.name}"? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelDeleteRef} onClick={onCloseDelete}>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={() => handleDeleteProduct(product._id)} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	);
};
export default ProductCard;
