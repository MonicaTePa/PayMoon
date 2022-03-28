export interface JwtResponse{
  dataUser:{
		_id?: any,
		name: string,
		identification: string,
		accessToken: string,
		expiresIn: string
	}
}