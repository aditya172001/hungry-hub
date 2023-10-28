import {
  addressType,
  courseType,
  cuisineType,
  itemPostType,
  itemPutType,
  openingHoursType,
  orderStatusType,
  paymentStatusType,
  vegType,
} from "validation";

export interface OrderType {
  orderID: string;
  restaurantName: string;
  restaurantProfilePicture: string;
  items: itemPutType[];
  orderStatus: orderStatusType;
  paymentStatus: paymentStatusType;
  deliveryAddress: addressType;
  orderDateTime: string;
}

export interface ReviewType {
  reviewID: string;
  restaurantName: string;
  restaurantProfilePicture: string;
  items: itemPutType[];
  rating: number;
  reviewText: string | undefined;
  deliveryAddress: addressType;
  reviewDateTime: string;
}

export interface RestaurantInfoType {
  restaurantID: string;
  restaurantName: string;
  description: string;
  profilePicture: string;
  address: addressType;
  openingHours: openingHoursType;
  menu: itemPostType[];
  rating: number;
  dining: boolean;
  nightlife: boolean;
}

export interface UserRestaurantBodyType {
  restaurantID: string;
  restaurantName: string;
  description: string;
  profilePicture: string;
  rating: number;
  avgPrice: number;
  openingHours: openingHoursType;
}

export interface UserSingleRestaurantDataType {
  restaurantID: string;
  restaurantName: string;
  description: string;
  profilePicture: string;
  address: addressType;
  rating: number;
  openingHours: openingHoursType;
  menu: ItemForUserMenuType[] | undefined;
}

export interface ItemForUserMenuType {
  itemID: string;
  itemName: string;
  description: string;
  imageURL: string;
  price: number;
  cuisine: cuisineType;
  course: courseType;
  veg: vegType;
}

export interface CartDataType {
  items: ItemForUserMenuType[];
  restaurantID: string;
}
