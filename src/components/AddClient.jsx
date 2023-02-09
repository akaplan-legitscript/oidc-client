import { useState, useEffect, useId } from "react";
import validator from "@rjsf/validator-ajv8";
import _ from "lodash";
import { useConfigStore } from "../store";
import { redirectURI } from "../lib/helpers";
import PicoForm from "./rjsf/PicoForm";

const schema = {
  title: 'Client',
  type: 'object',
  required: ['name', 'provider', 'id'],
  properties: {
    name: {
      title: 'Name',
      description: 'Unique name for this client.',
      type: 'string'
    },
    provider: {
      title: 'Provider',
      description: 'Identity Provider this client was issued from.',
      type: 'string'
    },
    id: {
      title: 'Client Id',
      description: `Client Id issued by the Provider. Be sure to configure \`${redirectURI()}\` as the \`redirect_uri\` for your provider.`,
      type: 'string'
    },
    authorize: {
      title: 'Custom Authorization Parameters',
      description: 'Additional parameters to add to `/authorize` requests.',
      type: 'object',
      properties: {
        audience: {
          title: 'Audience',
          description: 'Audience to request access too.',
          type: 'string'
        }
      }
    }
  }
};

const AddClient = ({ client = null }) => {
  const id = useId();
  const { configs, addClient } = useConfigStore((state) =>
    _.pick(state, ["configs", "addClient"])
  );

  const handleSubmit = (data, event) => {
    console.log('submit', data)
    const { formData, errors } = data;
    if (errors.length === 0) {
      addClient(formData);
    }
  };

  const uiSchema = {
    name: {
      "ui:disabled": client !== null
    },
    provider: {
      "ui:widget": "select",
      "options": {
        enumOptions: Object.keys(configs).map((provider => ({label: provider, value: provider})))
      }
    },
    authorize: {
      addButton: {
        label: 'Add Property'
      }
    },
    submitButtonOptions: {
      submitText: "Submit"
    }
  };

  return (
    <PicoForm schema={schema} uiSchema={uiSchema} validator={validator} idPrefix={id} formData={client} onSubmit={handleSubmit} />
  );
};

export default AddClient;
