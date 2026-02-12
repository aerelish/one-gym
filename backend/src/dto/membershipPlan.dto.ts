export interface CreateMembershipPlanDto {
	description?: string;
	durationInDays: number;
	name: string;
	price: number; // in pesos
}

export interface UpdateMembershipPlanDto {
	description?: string;
	durationInDays?: number;
	name?: string;
	price?: number; // in pesos
}
