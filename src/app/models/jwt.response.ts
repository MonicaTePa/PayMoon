export interface JwtResponse{
  dataUser:{
		_id?: any,
		name: string,
		identification: string,
		accesToken: string,
		expiresIn: string
	}
}