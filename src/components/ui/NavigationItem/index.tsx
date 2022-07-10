import Link from 'next/link';

export interface Props {
	link?: string;
	label: string;
	onClick?: any;
}

export function NavigationItem({ link = '#', ...props }: Props) {
	return (
		<Link href={`${link}`} {...props} passHref>
			<li onClick={props.onClick}>
				<a>{props.label}</a>
			</li>
		</Link>
	);
}
