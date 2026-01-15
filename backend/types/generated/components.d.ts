import type { Schema, Struct } from '@strapi/strapi';

export interface ProgramCourse extends Struct.ComponentSchema {
  collectionName: 'components_program_courses';
  info: {
    displayName: 'Course';
    icon: 'book';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'program.course': ProgramCourse;
    }
  }
}
