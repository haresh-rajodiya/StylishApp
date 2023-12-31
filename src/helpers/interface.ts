import { CSSProperties, ReactNode } from "react";
import { Image, ImageProps, StyleProp, ViewStyle } from "react-native";


export interface AppProps { }
export interface PreviewProps {
  
 }
export interface PreviewDataProps {
  image: Image;
  headingText: String;
  bodyText: String;
}
export interface AuthTextInputProps {
  placeholder?: String,
  UserIcon?: boolean,
  PasswordIcon?: boolean,
  EmailIcon?: boolean,
  style?: ViewStyle,
  onChangeText?: (text: string) => void;
  CountryCode?: string,
  CountryPress?: () => void;
}

export interface SettingsTextInputProps {
  title?: string;
  onChangeText?: ((text: string) => void) | undefined;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  PasswordIcon?: boolean;
  editable?: boolean;
}

export interface ScreenTemplateProps {
  children: ReactNode;
  scroll?: boolean,
  style?: ViewStyle,
}

export type Rating = {
  rate: Number,
  count: Number ,
}

export type Products = {
  id: Number,
  title: string,
  price: number,
  description: string,
  category: string,
  thumbnail: String,
  rating: Rating, 
  fav: boolean,
}

export type AddressCards = {
  id: number,
  address: string,
}

export interface CustomDropdownProps {
  items: number[];
  selectedValue: string;
  placeholder: string;
  onValueChange: (value: string) => void;
}