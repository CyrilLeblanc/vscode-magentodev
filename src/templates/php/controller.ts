export default `<?php

namespace {{namespace}};

use Magento\\Framework\\App\\ActionInterface;
use Magento\\Framework\\Controller\\ResultFactory;
use Magento\\Framework\\Controller\\ResultInterface;

class {{className}} implements ActionInterface
{
    /**
     * @var \\Magento\\Framework\\Controller\\ResultFactory
     */
    protected ResultFactory $resultFactory;

    /**
     * Constructor
     *
     * @param \\Magento\\Framework\\Controller\\ResultFactory $resultFactory
     */
    public function __construct(
        ResultFactory $resultFactory
    ) {
        $this->resultFactory = $resultFactory;
    }

    /**
     * @inheritdoc
     */
    public function execute() {
        return $this->resultFactory->create(ResultFactory::TYPE_PAGE);
    }
}
`;
