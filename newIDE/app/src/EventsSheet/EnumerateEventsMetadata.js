// @flow

import flatten from 'lodash/flatten';
import { mapFor } from '../Utils/MapFor';
const gd = global.gd;

export type EventMetadata = {|
  type: string,
  fullName: string,
  description: string,
|};

export const enumerateEventsMetadata = (): Array<EventMetadata> => {
  const allExtensions = gd
    .asPlatform(gd.JsPlatform.get())
    .getAllPlatformExtensions();

  return flatten(
    mapFor(0, allExtensions.size(), i => {
      const extension = allExtensions.get(i);
      const extensionEvents = extension.getAllEvents();

      return extensionEvents
        .keys()
        .toJSArray()
        .map(type => {
          const metadata = extensionEvents.get(type);
          return {
            type,
            fullName: metadata.getFullName(),
            description: metadata.getDescription(),
          };
        });
    })
  );
};
