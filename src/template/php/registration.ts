export type PhpRegistrationTemplateData = {
	moduleName: string;
};

export default (data: PhpRegistrationTemplateData) => `<?php

use Magento\\Framework\\Component\\ComponentRegistrar;

ComponentRegistrar::register(
    ComponentRegistrar::MODULE,
    '${data.moduleName}',
    __DIR__
);
`;
