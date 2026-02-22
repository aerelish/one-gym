enum SubscriptionStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	CANCELLED = 'CANCELLED',
	EXPIRED = 'EXPIRED',
}

interface Subscription {
	id: number;
	userId: string;
	planId: number;
	status: SubscriptionStatus;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
	user?: User;
	plan?: MembershipPlan;
}

type SubscriptionCreateInput = Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>;
type SubscriptionUpdateInput = Partial<Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>>;
