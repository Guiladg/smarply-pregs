import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import Publicacion from './publicacion';

@Entity('pregunta')
@Unique(['pregId'])
export default class Pregunta extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'bigint' })
	pregId: number;

	@Column({ type: 'text' })
	texto: string;

	@ManyToOne(() => Publicacion, { eager: true })
	publicacion: Publicacion;

	@Column({ nullable: true, default: null })
	resPublicacion: boolean;

	@Column({ nullable: true, default: null })
	resFormulario: boolean;
}
