import { PhpClassTemplateData } from "./class";

export type PhpBlockTemplateData = {} & PhpClassTemplateData;

export default (data: PhpBlockTemplateData) => `<?php

namespace ${data.namespace};

use Magento\\Framework\\View\\Element\\Template;
use Magento\\Framework\\View\\Element\\Template\\Context;

class ${data.className} extends Template
{
    /**
     * Constructor
     *
     * @param \\Magento\\Framework\\View\\Element\\Template\\Context $context
     * @param array $data
     */
    public function __construct(
        Context $context,
        array $data = []
    ) {
        return parent::__construct($context, $data);
    }
}
`;
