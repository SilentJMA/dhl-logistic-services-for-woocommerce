<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly


class PR_DHL_API_Factory {

	public static function init() {
		// Load abstract classes
		include_once( 'abstract-pr-dhl-api-rest.php' );
		include_once( 'abstract-pr-dhl-api-soap.php' );
		include_once( 'abstract-pr-dhl-api.php' );

		// Load interfaces
		include_once( 'interface-pr-dhl-api-label.php' );
	}

	public static function make_dhl( $country_code ) {
		static $cache = array();

		// If object exists in cache, simply return it
		if ( array_key_exists( $country_code, $cache ) ) {
			return $cache[ $country_code ];
		}

		PR_DHL_API_Factory::init();

		$dhl_obj = null;

		try {
			switch ($country_code) {
				case 'US':
				case 'GU':
				case 'AS':
				case 'PR':
				case 'UM':
				case 'VI':
				case 'CA':
//                    $dhl_obj = new PR_DHL_API_eCS_US( $country_code );
//                    break;
                    throw new Exception( __('The DHL plugin is not supported in your store\'s "Base Location"', 'pr-shipping-dhl') );
				case 'SG':
				case 'HK':
				case 'TH':
//				case 'JP':
				case 'CN':
				case 'MY':
				case 'VN':
				case 'AU':
				case 'IL':
//				case 'NZ':
//				case 'TW':
//				case 'KR':
//				case 'PH':
				case 'IN':
					//$dhl_obj = new PR_DHL_API_Ecomm( $country_code);
					$dhl_obj = new PR_DHL_API_eCS_Asia( $country_code );
					break;
				case 'DE':
					$dhl_obj = new PR_DHL_API_Paket( $country_code );
					break;
                case 'AT':
				case 'AL':
				case 'AD':
				case 'AM':
				case 'AZ':
				case 'BY':
				case 'BE':
				case 'BA':
				case 'BG':
				case 'HR':
				case 'CY':
				case 'CZ':
				case 'DK':
				case 'EE':
				case 'FI':
				case 'FR':
				case 'GE':
				case 'GR':
				case 'HU':
				case 'IS':
				case 'IE':
				case 'IT':
				case 'KM':
				case 'LV':
				case 'LI':
				case 'LT':
				case 'LU':
				case 'MT':
				case 'MD':
				case 'MC':
				case 'ME':
				case 'NL':
				case 'MK':
				case 'NO':
				case 'PL':
				case 'PT':
				case 'RO':
				case 'RU':
				case 'SM':
				case 'RS':
				case 'SK':
				case 'SI':
				case 'ES':
				case 'SE':
				case 'CH':
				case 'TR':
				case 'UA':
				case 'GB':
				case 'VA':
					$dhl_obj = new PR_DHL_API_Deutsche_Post( $country_code );
					break;
				default:
					throw new Exception( __('The DHL plugin is not supported in your store\'s "Base Location"', 'pr-shipping-dhl') );
			}
		} catch (Exception $e) {
			throw $e;
		}

		// Cache the object to optimize later invocations of the factory
		$cache[ $country_code ] = $dhl_obj;

		return $dhl_obj;
	}
}
