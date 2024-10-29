import { PhpClassTemplateData } from "./class";

export type PhpControllerTemplateData = {} & PhpClassTemplateData;

export default (data: PhpControllerTemplateData) => `<?php

namespace ${data.namespace};

use Magento\\Framework\\App\\ActionInterface;
use Magento\\Framework\\Controller\\ResultFactory;
use Magento\\Framework\\Controller\\ResultInterface;

class ${data.className} implements ActionInterface
{
    /**
     * Constructor
     *
     * @param \\Magento\\Framework\\Controller\\ResultFactory $resultFactory
     */
    public function __construct(
        protected ResultFactory $resultFactory
    ) {
    }

    /**
     * @inheritdoc
     */
    public function execute() {
        return $this->resultFactory->create(ResultFactory::TYPE_PAGE);
    }
}
`;
