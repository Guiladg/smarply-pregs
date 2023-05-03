import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import Pregunta from './pregunta';

@Entity('publicacion')
@Unique(['meLiId'])
export default class Publicacion extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'bigint' })
	meLiId: number;

	@Column({ type: 'simple-array' })
	cats: string[];

	@OneToMany(() => Pregunta, (pregunta: Pregunta) => pregunta.publicacion)
	preguntas: Pregunta[];

	// For retrieving from MeLi website
	htmlData: any;
}
